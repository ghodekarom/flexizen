package com.flexizen.dao;

import com.flexizen.model.Page;
import com.flexizen.model.enums.PageType;

public interface PageDao {
    Page findByType(PageType type);
    Page update(Page page);
}
