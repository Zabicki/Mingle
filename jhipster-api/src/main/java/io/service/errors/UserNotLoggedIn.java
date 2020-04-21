package io.service.errors;

public class UserNotLoggedIn extends RuntimeException{
    public UserNotLoggedIn(){
        super("No one is logged in!");
    }
}
