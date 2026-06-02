package com.eha.quizservice.repository;

import com.eha.quizservice.model.QuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {
}
