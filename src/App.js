import React, { useState } from 'react'
import {
  Container,
  Header,
  Grid,
  Form,
  TextArea,
  Button
} from 'semantic-ui-react'
import './App.css'
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()

function App() {
  const [input, setInput] = useState('')
  const [markedDownText, setMarkedDownText] = useState('')

  const handleChange = (evt) => {
    // updates input, and formats markdown side of text
    setInput(evt.target.value)
    format(evt.target.value)
  }

  const handleClear = (evt) => {
    setInput('')
    setMarkedDownText('')
  }

  const handleCopy = (evt) => {
    navigator.clipboard.writeText(markedDownText)
    evt.target.focus()
  }

  const format = (str) => {
    // formats input by line to maintain new lines
    const formatted = str
      .split(`\n`)
      .map((el) => md.render(el))
      .join(`\n`)
    setMarkedDownText(formatted)
  }
  return (
    <Container className="App">
      <Header as="h1">Markdown Editor</Header>
      <p>
        created by <a href="http://github.com/jsmney">@jsmney</a>
      </p>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Form>
              <TextArea
                value={input}
                style={{ minHeight: 250 }}
                onChange={handleChange}
              ></TextArea>
            </Form>
            <Button onClick={handleClear}>Clear</Button>
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Formatted Text Preview</Header>
            <div dangerouslySetInnerHTML={{ __html: markedDownText }}></div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Header as="h3">Formatted Text as HTML</Header>
            <TextArea
              value={markedDownText}
              style={{ minHeight: 250, minWidth: '100%' }}
            ></TextArea>
            <Button onClick={handleCopy}>Copy</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default App
