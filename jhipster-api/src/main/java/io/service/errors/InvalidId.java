package io.service.errors;

public class InvalidId extends RuntimeException{
    public InvalidId(){
        super("Entity not found! Invalid Id!");
    }
}
