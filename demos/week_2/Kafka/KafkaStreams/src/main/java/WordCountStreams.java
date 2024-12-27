import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Materialized;
import org.apache.kafka.streams.kstream.Produced;

import java.util.Arrays;
import java.util.Properties;

public class WordCountStreams {

    public static void main(String[] args) {
        // Define the Kafka Streams Config

        Properties props = new Properties();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "word-count-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass().getName());
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass().getName());
        props.put("file.encoding", "UTF-8");

        // Build the stream processing topology
        StreamsBuilder builder = new StreamsBuilder();

        // Read from the input topic
        KStream<String, String> inputStream = builder.stream("input-topic");

        // process the stream (split sentences into words and counting them)
        inputStream
                .flatMapValues((readOnlyKey, value) -> Arrays.asList(value.toLowerCase().split(" ")))
                .groupBy((key, word) -> word)
                .count(Materialized.with(Serdes.String(), Serdes.Long()))
                .toStream()
                .to("output-topic", Produced.with(Serdes.String(), Serdes.Long()));

        // Build and start the kafka stream application
        KafkaStreams streams = new KafkaStreams(builder.build(), props);

        streams.start();

        // Add shutdown hook for graceful exit
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));

        System.out.println("Kafka streams word count app started!");
    }
}
