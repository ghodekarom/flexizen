package com.flexizen.service;

import com.flexizen.model.YogaClass;
import java.util.List;

public interface ClassService {
    YogaClass createClass(YogaClass yogaClass);
    YogaClass getClassById(Long id);
    List<YogaClass> getAllClasses();
    YogaClass updateClass(Long id, YogaClass yogaClass);
    void deleteClass(Long id);
}
