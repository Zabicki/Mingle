package io.service;

import io.MingleApp;
import io.domain.Chat;
import io.domain.Message;
import io.domain.User;
import io.repository.ChatRepository;
import io.repository.MessageRepository;
import io.repository.UserRepository;
import io.service.errors.InvalidId;
import io.service.errors.UserHaveNoAccess;
import io.service.errors.UserNotLoggedIn;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.test.context.support.WithMockUser;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(classes = MingleApp.class)
public class ChatServiceIT {

    @Autowired
    private ChatService chatService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    private final Pageable pageable = Pageable.unpaged();

    private Chat chat;

    private User user;

    @BeforeEach
    public void setup(){

        userRepository.deleteAll();
        user = new User();
        user.setLogin("user");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setEmail("some@mail.com");
        userRepository.save(user);

        User user2 = new User();
        user2.setLogin("other");
        user2.setPassword(RandomStringUtils.random(60));
        user2.setActivated(true);
        user2.setEmail("someOther@mail.com");
        userRepository.save(user2);

        chat = new Chat().addChatters(user);
        chatRepository.deleteAll();
        chatRepository.save(chat);

        messageRepository.deleteAll();
    }

    @Test
    @WithMockUser("user")
    public void testSubmitMessage(){

        assertThat(messageRepository.findByChat(chat.getId(), pageable)).isEmpty();

        chatService.submitMessage(chat.getId(),"message");

        assertThat(messageRepository.findByChat(chat.getId(),pageable)).isNotEmpty();
        assertThat(messageRepository.findByChat(chat.getId(),pageable).getTotalElements()).isEqualTo(1);

        Message msg= messageRepository.findByChat(chat.getId(),pageable).getContent().get(0);

        assertThat(msg.getText()).isEqualTo("message");
        assertThat(msg.getUser().getLogin()).isEqualTo(user.getLogin());
    }

    @Test
    @WithMockUser("user")
    public void testSubmitMessageWithIncorrectChatId(){
        assertThrows(InvalidId.class, () ->
            chatService.submitMessage("some random string","msg")
        );
    }

    @Test
    public void testSubmitMessageWithNoOneLoggedIn(){
        assertThrows(UserNotLoggedIn.class, () ->
            chatService.submitMessage(chat.getId(),"msg")
        );
    }

    @Test
    @WithMockUser("other")
    public void testSubmitMessageWithUserThatIsNotInTheChat(){
        assertThrows(UserHaveNoAccess.class, () ->
            chatService.submitMessage(chat.getId(),"msg")
        );
    }
}
