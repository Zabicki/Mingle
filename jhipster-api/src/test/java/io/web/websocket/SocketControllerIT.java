package io.web.websocket;

import io.MingleApp;
import io.domain.Chat;
import io.domain.Message;
import io.domain.User;
import io.repository.ChatRepository;
import io.repository.MessageRepository;
import io.repository.UserRepository;
import io.service.ChatService;
import io.web.rest.errors.ExceptionTranslator;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import static io.web.rest.TestUtil.createFormattingConversionService;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = MingleApp.class)
public class SocketControllerIT {


    private Chat chat;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private PageableArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private ChatService chatService;

    private User user;

    private Message message;

    private MockMvc socketControllerMvc;



    @BeforeEach
    public void setup(){
        MockitoAnnotations.initMocks(this);
        final SocketController socketController = new SocketController(chatService);
        this.socketControllerMvc = MockMvcBuilders.standaloneSetup(socketController)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();



        userRepository.deleteAll();
        chatRepository.deleteAll();
        messageRepository.deleteAll();

        user = new User();
        user.setLogin("user");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setEmail("some@mail.com");
        userRepository.save(user);

        chat = new Chat().addChatters(user);
        chatRepository.save(chat);

        message = new Message().user(user).text("some message").chat(chat);
        messageRepository.save(message);
    }

    @Test
    public void testGetMessages() throws Exception{


        socketControllerMvc.perform(get("/api/chat/" + chat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*]._id").value(hasSize(1)))
            .andExpect(jsonPath("$.[*]._id").value(hasItem(message.getId())));
    }

    @Test
    @WithMockUser("user")
    public void testGetChats() throws Exception{
        Chat chat2 = new Chat();
        chatRepository.save(chat2);

        socketControllerMvc.perform(get("/api/chat"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andExpect(jsonPath("$.[*].id").value(hasSize(1)))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chat.getId())));
    }
}
