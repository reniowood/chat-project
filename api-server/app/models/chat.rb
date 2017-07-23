require 'bunny'
require 'redis'

class Chat < ApplicationRecord
    has_many :user_chats
    has_many :users, through: :user_chats

    def send_message(sender_id, message)
        send_message_to_mq(sender_id, {
            id: self.id,
            msg: message
        })
        p "#{sender_id} - \"#{message}\""
    end

    def get_messages()
        get_messages_from_redis()
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

    def get_messages_from_redis()
        begin
            redis = Redis.new

            result = redis.lrange("c:#{self.id}", 0, -1)
            if result.nil?
                return []
            else
                return result.map { |message| JSON.parse(message) }
            end
        rescue Exception => e
            p e.message
        end
    end
end
