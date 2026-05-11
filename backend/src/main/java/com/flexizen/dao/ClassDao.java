package com.flexizen.dao;

import com.flexizen.model.YogaClass;
import java.util.List;

public interface ClassDao {
    YogaClass save(YogaClass yogaClass);
    YogaClass findById(Long id);
    List<YogaClass> findAll();
    YogaClass update(YogaClass yogaClass);
    void delete(Long id);
}
