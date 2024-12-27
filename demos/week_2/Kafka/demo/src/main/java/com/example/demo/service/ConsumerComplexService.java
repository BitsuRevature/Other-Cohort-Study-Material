package com.example.demo.service;

import com.example.demo.model.Event;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConsumerComplexService {

    private final List<Event> events = new ArrayList<>();

    @KafkaListener(topics = "complex-events", groupId = "event-group", containerFactory = "kafkaListenerContainerFactory")
    public void consume(Event event){
        events.add(event);
        System.out.println("Consumed event: " + event.getType() + " - " + event.getData().getName());
    }

    public List<Event> getEvents(){
        return events;

    }
}
