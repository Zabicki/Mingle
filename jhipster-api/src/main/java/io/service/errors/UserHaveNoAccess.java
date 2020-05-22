package io.service.errors;

public class UserHaveNoAccess extends RuntimeException{
    public UserHaveNoAccess(){
        super("You have no access to this resource");
    }
}
