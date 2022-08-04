import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactWordcloud from "react-wordcloud";
import COLORS from '../../constant/Colors';

const data = [
    {
        text: "R",
        value: 55
    },
    {
        text: "Java",
        value: 19
    },
    {
        text: "Php",
        value: 33
    },
    {
        text: "Javascript",
        value: 79
    },
    {
        text: "Golang",
        value: 28
    },
    {
        text: "C++",
        value: 63
    },
    {
        text: "Python",
        value: 91
    },
    {
        text: "C#",
        value: 23
    },
    {
        text: "Matlab",
        value: 11
    },
    {
        text: "Kotlin",
        value: 53
    },
    {
        text: "NodeJs",
        value: 44
    }
  ]

const angles:[number, number] = [-10, 10]
const fontSizes:[number, number] = [20,80]

const options = {
    enableTooltip: true,
    rotations: 3,
    rotationAngles: angles,
    fontSizes: fontSizes
  };

function KeywordCloud() {
    return (
        <ReactWordcloud options={options} words={data} />
    )
}

export default KeywordCloud;