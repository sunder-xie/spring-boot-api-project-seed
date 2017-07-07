package com.sunder.whats.service.location.impl;

import com.sunder.whats.core.AbstractService;
import com.sunder.whats.mapper.location.LocationMapper;
import com.sunder.whats.entity.Location;
import com.sunder.whats.service.location.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Created by sunder on 2017/07/07.
 */
@Service
@Transactional
public class LocationServiceImpl extends AbstractService<Location> implements LocationService {
    @Autowired
    private LocationMapper locationMapper;

}
