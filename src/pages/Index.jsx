import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const saveTask = (id, newText) => {
    if (newText.trim() === '') {
      toast({
        title: 'Cannot save empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" mb={4} justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Flex mb={4}>
        <Input placeholder="Add a new task" value={input} onChange={handleInputChange} />
        <IconButton icon={<FaPlus />} ml={2} onClick={addTask} aria-label="Add task" />
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            {task.isEditing ? (
              <Input defaultValue={task.text} onBlur={(e) => saveTask(task.id, e.target.value)} autoFocus />
            ) : (
              <Text flex="1">{task.text}</Text>
            )}
            <IconButton icon={<FaEdit />} ml={2} onClick={() => editTask(task.id)} aria-label="Edit task" />
            <IconButton icon={<FaTrash />} ml={2} onClick={() => deleteTask(task.id)} aria-label="Delete task" />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;