require 'bunny'
require 'redis'

class Chat < ApplicationRecord
    has_many :user_chats
    has_many :users, through: :user_chats

    def as_json(options={})
        options[:only] ||= [:id, :name]
        super(options)
    end

    def send_message(sender_id, message)
        send_message_to_mq(sender_id, {
            id: self.id,
            chat_name: self.name,
            sender_id: sender_id,
            msg: message
        })
    end

    def user_ids
        self.users.map { |user| user.id }
    end

    def messages
        get_messages_from_redis
    end

    def last_message
        message = get_last_message_from_redis
        if message
            message = JSON.parse(message)

            return message['msg']['msg'] if message
        else
            return ''
        end
    end

    private

    def send_message_to_mq(sender_id, msg)
        connection = Bunny.new(hostname: Rails.configuration.mq['host'])
        connection.start

        channel = connection.channel
        queue_prefix = Rails.configuration.mq['queue']['prefix']
        num_queue = Rails.configuration.mq['queue']['num']
        queue = channel.queue("#{queue_prefix}_#{sender_id % num_queue}", durable: true)
        channel.default_exchange.publish(msg.to_json, routing_key: queue.name)

        connection.close
    end
    
    def get_last_message_from_redis
        begin
            redis = Redis.new(host: Rails.configuration.redis['host'], port: Rails.configuration.redis['port'])

            result = redis.lrange("c:#{self.id}", 0, 0)
            if result
                return result[0]
            else
                return nil
            end
        rescue Exception => e
            p e.message
        end
    end

    def get_messages_from_redis
        begin
            redis = Redis.new(host: Rails.configuration.redis['host'], port: Rails.configuration.redis['port'])

            result = redis.lrange("c:#{self.id}", 0, -1)
            if result.nil?
                return []
            else
                return result.map do |message|
                    JSON.parse(message)
                end
            end
        rescue Exception => e
            p e.message
        end
    end
end
