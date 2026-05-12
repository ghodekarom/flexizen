package com.flexizen.service;

import com.flexizen.dao.ClassDao;
import com.flexizen.model.YogaClass;
import com.flexizen.service.impl.ClassServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClassServiceTest {

    @Mock
    private ClassDao classDao;

    @InjectMocks
    private ClassServiceImpl classService;

    private YogaClass yogaClass;

    @BeforeEach
    void setUp() {
        yogaClass = new YogaClass();
        yogaClass.setId(1L);
        yogaClass.setName("Hatha Yoga");
        yogaClass.setDurationMinutes(60);
        yogaClass.setCapacity(20);
    }

    @Test
    void testGetAllClasses() {
        when(classDao.findAll()).thenReturn(Arrays.asList(yogaClass));

        List<YogaClass> result = classService.getAllClasses();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Hatha Yoga", result.get(0).getName());
        verify(classDao, times(1)).findAll();
    }

    @Test
    void testGetClassById() {
        when(classDao.findById(1L)).thenReturn(yogaClass);

        YogaClass result = classService.getClassById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(classDao, times(1)).findById(1L);
    }

    @Test
    void testCreateClass() {
        when(classDao.save(any(YogaClass.class))).thenReturn(yogaClass);

        YogaClass result = classService.createClass(yogaClass);

        assertNotNull(result);
        assertEquals("Hatha Yoga", result.getName());
        verify(classDao, times(1)).save(yogaClass);
    }

    @Test
    void testDeleteClass() {
        when(classDao.findById(1L)).thenReturn(yogaClass);
        doNothing().when(classDao).delete(1L);

        classService.deleteClass(1L);

        verify(classDao, times(1)).delete(1L);
    }
}
