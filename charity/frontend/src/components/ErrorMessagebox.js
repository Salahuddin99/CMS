import { Alert } from 'react-bootstrap'

export default function ErrorMessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>
}
