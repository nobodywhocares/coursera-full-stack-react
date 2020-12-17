/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React from 'react';

export const Loading = () => {
    return(
        <div className="col-12">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <p>Loading . . .</p>
        </div>
    );
};