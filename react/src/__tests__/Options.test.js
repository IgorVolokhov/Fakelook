import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Options from '../components/Options';

it('Check if Options renders', () => {
    render(<Options/>)
})

// it ("onClick", () => {
//     const { queryByTitle } = render(<Options />);
//     const btn = queryByTitle("addPostBtn");
//     fireEvent.click(btn)
// })