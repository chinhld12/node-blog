import React from 'react';
import Icon from '../icon';
import { Text, Box } from '@chakra-ui/core';

export default () => {
    return (
        <Box textAlign="center">
            <Icon fill="theme.border" width="150px" height="120px" name="empty"></Icon>
            <Text fontWeight="bold" color="theme.primaryText" fontSize={15}>
                ~暂无数据~
            </Text>
        </Box>
    );
};
