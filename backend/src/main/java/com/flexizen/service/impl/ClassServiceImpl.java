package com.flexizen.service.impl;

import com.flexizen.dao.ClassDao;
import com.flexizen.exception.ResourceNotFoundException;
import com.flexizen.model.YogaClass;
import com.flexizen.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class ClassServiceImpl implements ClassService {

    @Autowired
    private ClassDao classDao;

    @Override
    public YogaClass createClass(YogaClass yogaClass) {
        return classDao.save(yogaClass);
    }

    @Override
    @Transactional(readOnly = true)
    public YogaClass getClassById(Long id) {
        YogaClass yogaClass = classDao.findById(id);
        if (yogaClass == null) {
            throw new ResourceNotFoundException("YogaClass", id);
        }
        return yogaClass;
    }

    @Override
    @Transactional(readOnly = true)
    public List<YogaClass> getAllClasses() {
        return classDao.findAll();
    }

    @Override
    public YogaClass updateClass(Long id, YogaClass yogaClassDetails) {
        YogaClass existingClass = getClassById(id);
        
        existingClass.setName(yogaClassDetails.getName());
        existingClass.setDescription(yogaClassDetails.getDescription());
        existingClass.setDurationMinutes(yogaClassDetails.getDurationMinutes());
        existingClass.setSchedule(yogaClassDetails.getSchedule());
        existingClass.setCapacity(yogaClassDetails.getCapacity());
        existingClass.setFee(yogaClassDetails.getFee());
        
        return classDao.update(existingClass);
    }

    @Override
    public void deleteClass(Long id) {
        getClassById(id); // Ensure exists
        classDao.delete(id);
    }
}
