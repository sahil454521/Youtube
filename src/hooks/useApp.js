import { useDispatch, useSelector } from 'react-redux';

const useAppDispatch = () => useDispatch();  // Note the parentheses here
const useAppSelector = useSelector;

export { useAppDispatch, useAppSelector };