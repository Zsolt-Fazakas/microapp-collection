package com.example.Backend.Repository;

import com.example.Backend.Model.UserSummary;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSummaryRepository extends CrudRepository<UserSummary,Integer> {
}
