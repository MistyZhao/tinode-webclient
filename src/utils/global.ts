import React, { useEffect, useState, useCallback } from 'react';



// 引入assets静态图片地址
export const getAssetsImage = (url: string) => {
    return new URL(`../assets/imgs/pku/${url}`, import.meta.url).href;
};


