package com.example.Backend.Service;

import com.example.Backend.Model.UserSummary;
import com.example.Backend.Repository.UserRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.Model.User;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class UserService {
    private final WebClient.Builder webClientBuilder;
    @Autowired
    public  UserService(WebClient.Builder webClientBuilder){
        this.webClientBuilder = webClientBuilder;
    }
    @Autowired
    private UserRepository userRepository;
    public Iterable<User> GetAll(){return userRepository.findAll();}
    public User insert(User user) {
        return userRepository.save(user);
    }
    public User findEmail(String email) {return userRepository.findByEmail(email);}
    public void deleteUser(Integer id){
        if(!userRepository.existsById(id)){
            throw new ResourceNotFoundException("Device not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
    public User updateUser(Integer id, User userDetails) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        existingUser.setName(userDetails.getName());
        existingUser.setSurname(userDetails.getSurname());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setPassword(userDetails.getPassword());
        existingUser.setRole(userDetails.getRole());

        return userRepository.save(existingUser);
    }

    public Mono<UserSummary> sendUserSummary(UserSummary userSummary) {
        String url = "http://localhost:8081/CreateSummary";

        return webClientBuilder.build()
                .post()
                .uri(url)
                .body(Mono.just(userSummary), UserSummary.class)
                .retrieve()
                .onStatus(
                        httpStatus -> httpStatus.is4xxClientError() || httpStatus.is5xxServerError(),
                        clientResponse -> {
                            System.err.println("Hiba történt: " + clientResponse.statusCode());
                            return Mono.error(new RuntimeException("Nem sikerült az adatküldés"));
                        }
                )
                .bodyToMono(UserSummary.class)
                .doOnError(error -> System.err.println("Hiba történt: " + error.getMessage()));
    }
    public Mono<Void> deleteUserSummary(Integer id) {
        String url = "http://localhost:8081/DeleteSummary/" + id;

        return webClientBuilder.build()
                .delete()
                .uri(url)
                .retrieve()
                .onStatus(
                        httpStatus -> httpStatus.is4xxClientError() || httpStatus.is5xxServerError(),
                        clientResponse -> {
                            System.err.println("Hiba történt: " + clientResponse.statusCode());
                            return Mono.error(new RuntimeException("Nem sikerült a törlés"));
                        }
                )
                .bodyToMono(Void.class)
                .doOnError(error -> System.err.println("Hiba történt: " + error.getMessage()));
    }

    public Mono<UserSummary> updateUserSummary(Integer id, UserSummary userSummaryDetails) {
        String url = "http://localhost:8081/UpdateSummary/" + id;

        return webClientBuilder.build()
                .put()
                .uri(url)
                .body(Mono.just(userSummaryDetails), UserSummary.class)
                .retrieve()
                .onStatus(
                        httpStatus -> httpStatus.is4xxClientError() || httpStatus.is5xxServerError(),
                        clientResponse -> {
                            System.err.println("Hiba történt: " + clientResponse.statusCode());
                            return Mono.error(new RuntimeException("Nem sikerült a frissítés"));
                        }
                )
                .bodyToMono(UserSummary.class)
                .doOnError(error -> System.err.println("Hiba történt: " + error.getMessage()));
    }

}
