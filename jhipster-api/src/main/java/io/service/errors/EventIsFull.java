package io.service.errors;

public class EventIsFull extends RuntimeException{
    public EventIsFull(){
        super("Event is full");
    }
}
