import Head from 'next/head'
import { Typography, makeStyles, IconButton, Paper, Divider, InputBase, Container, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import { Send, Close } from '@material-ui/icons'
import { tasks } from '../src/mock_data'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5, 0),
    textAlign: "center",
    height: "100vh",
    background: "#f3f3f3"
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: 600,
    // padding: theme.spacing(2, 0)
  },
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: theme.spacing(2, 0),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  listItem: { background: "#ececec", borderRadius: 5, margin: theme.spacing(1, 0) }
}))

export default function Home() {
  const classes = useStyles()
  const [allTasks, setAllTasks] = React.useState(tasks)
  const initialTask = { title: "", done: false }
  const [task, setTask] = React.useState(initialTask)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.title) {
      setAllTasks(prevState => [...prevState, task])
      return setTask(initialTask)
    }
  }
  const handleChange = (e) => {
    setTask({ title: e.target.value })
  }
  const handleRemove = (e) => {
    // console.log(e.currentTarget.value)
    const updatedTasks = allTasks.filter(task => task.title !== e.currentTarget.value)
    setAllTasks(updatedTasks)
  }
  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="sm" >
          <Typography className={classes.title}>TaskMaster</Typography>
          <Typography variant="caption" color="textSecondary">TaskMaster is simple task keeping site made with NextJS</Typography>
          <Paper
            component='form'
            className={classes.paper}
            onSubmit={handleSubmit}>
            <InputBase
              autoFocus
              className={classes.input}
              values={task.title}
              placeholder='New Task'
              onChange={handleChange}
            />
            <Divider className={classes.divider} orientation='vertical' />
            <IconButton
              color='primary'
              className={classes.iconButton}
              onClick={handleSubmit}>
              <Send />
            </IconButton>
          </Paper>

          <div>
            <List>
              {allTasks.map((_) => (
                <ListItem className={classes.listItem} key={_.title}>
                  <ListItemText primary={
                    <Typography variant="body2">{_.title}</Typography>
                  } />
                  <ListItemSecondaryAction>
                    <IconButton value={_.title} onClick={handleRemove}>
                      <Close />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}

            </List>
          </div>
        </Container>
      </div>
    </>
  )
}
