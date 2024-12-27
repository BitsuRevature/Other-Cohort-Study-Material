package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.service.ConsumerComplexService;
import com.example.demo.service.ProducerComplexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

    @Autowired
    private ProducerComplexService producerComplexService;

    @Autowired
    private ConsumerComplexService consumerComplexService;

    @PostMapping
    public void sendEvent(@RequestBody Event event){
        event.setId(UUID.randomUUID().toString());
        event.setTimestamp(LocalDateTime.now());
        producerComplexService.sendEvent(event);
    }

    @GetMapping
    public List<Event> getEvents(){
        return consumerComplexService.getEvents();
    }
}
