import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomButton from '../models/CustomButton';

it('Check if button renders', () => {
    render(<CustomButton/>)
})