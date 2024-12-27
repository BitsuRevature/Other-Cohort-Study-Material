package com.example.demo.model;

import java.time.LocalDateTime;

public class Event {
    private String id;
    private String type;
    private Recipe data;
    private LocalDateTime timestamp;

    public Event(){}

    public Event(String id, String type, Recipe data, LocalDateTime timestamp) {
        this.id = id;
        this.type = type;
        this.data = data;
        this.timestamp = timestamp;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Recipe getData() {
        return data;
    }

    public void setData(Recipe data) {
        this.data = data;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
