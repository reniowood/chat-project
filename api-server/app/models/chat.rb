require 'bunny'

class Chat < ApplicationRecord
    has_many :user_chats
    has_many :users, through: :user_chats

    def send_message(sender_id, message)
        send_message_to_mq(sender_id, {
            from: sender_id,
            msg: message
        })
        p "#{sender_id} - \"#{message}\""
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
end
