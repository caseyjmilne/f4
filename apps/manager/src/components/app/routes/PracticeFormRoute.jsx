import exampleFormSchema from '../../form/formSchema';
import Form from '../../form/Form';

export default function PracticeFormRoute() {


  return (
    <div style={{ padding: '2rem' }}>
      <h2>Form Practice</h2>
      <Form definition={exampleFormSchema} />
    </div>
  );
}
