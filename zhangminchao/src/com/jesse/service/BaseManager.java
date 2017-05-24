package com.jesse.service;


import java.util.Map;

import org.apache.velocity.app.VelocityEngine;
import org.open.posgoo.common.utils.view.url.URLBroker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.velocity.VelocityEngineUtils;

public abstract class BaseManager {

    // 日志
    protected final Logger log = LoggerFactory.getLogger(this.getClass());

    
}
