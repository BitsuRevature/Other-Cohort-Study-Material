package com.example.demo.service;

import com.example.demo.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProducerComplexService {

    private static final String TOPIC = "complex-events";

    @Autowired
    private KafkaTemplate<String, Event> kafkaTemplate;

    public void sendEvent(Event event){
        kafkaTemplate.send(TOPIC, event);
    }
}
