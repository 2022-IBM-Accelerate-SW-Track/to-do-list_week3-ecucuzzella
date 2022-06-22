import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});



 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputText = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputText, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: {value : "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);
  fireEvent.change(inputText, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: {value : "05/30/2024"}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.queryByText(new RegExp("05/30/2024", "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBe(null);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputText = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputText, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);
  const check = screen.queryByText(new RegExp("05/30/2023", "i"));
  expect(check).toBe(null);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputText = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputText, { target: { value: "History Test"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);
  const check = screen.queryByText(/History Test/i);
  expect(check).toBe(null);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputText = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputText, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: {value : "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);
  const checkbox = screen.getByRole('checkbox', {checked: false});
  fireEvent.change(checkbox, {target: {checked: true}});
  const check = screen.queryByText(/HistoryTest/i);
  expect(check).toBe(null);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputText = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputText, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: {value : "05/30/2023"}});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);
  const inputTextPast = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDatePast = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputTextPast, { target: {value: "Science Test"}});
  fireEvent.change(inputDatePast, { target: {value: "05/30/2020"}});
  fireEvent.click(element);
  const pastColor = screen.getByTestId(/Science Test/i).style.background;
  const color = screen.getByTestId(/History Test/i).style.background;
  expect(pastColor).toBe("red");
  expect(color).toBe("");
 });
