import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function IngredientList({ingredients}: { ingredients: string[] }) {

  return (
        <List dense disablePadding>
          {ingredients.map(ingredient => (
            <ListItem key={ingredient}>
              <ListItemText
                primary={'- ' + ingredient}
              />
            </ListItem>
          ))}
        </List>
  );
}
