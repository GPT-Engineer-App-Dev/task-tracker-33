import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
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

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const handleSaveTask = (id, newText) => {
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

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton aria-label="Add task" icon={<FaPlus />} onClick={handleAddTask} ml={2} />
        </Flex>
        <List w="full">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} borderWidth="1px" borderRadius="lg">
              {task.isEditing ? (
                <Input defaultValue={task.text} onBlur={(e) => handleSaveTask(task.id, e.target.value)} autoFocus />
              ) : (
                <Text>{task.text}</Text>
              )}
              <Flex>
                {task.isEditing ? (
                  <IconButton aria-label="Save task" icon={<FaSave />} onClick={() => handleSaveTask(task.id, document.getElementById(`input-${task.id}`).value)} />
                ) : (
                  <IconButton aria-label="Edit task" icon={<FaEdit />} onClick={() => handleEditTask(task.id)} />
                )}
                <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} ml={2} />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;