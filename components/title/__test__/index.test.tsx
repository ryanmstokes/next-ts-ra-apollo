/**
 * @jest-environment jsdom 
 */
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Title from "components/title/"

test('renders a title', async () => {
    render(<Title title="Hello" />)
    expect(screen.getByText('Hello'))
})