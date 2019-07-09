const AddReview = (props) => {
  let formFields = {}

  return (
    <form onSubmit={(e) => {
      props.handleFormSubmit(formFields.email.value, formFields.date.value, formFields.movie_id.value, formFields.rating.value, formFields.comment.value);
      e.target.reset();
    }}>
      <input type='email' ref={input => formFields.email = input} placeholder='Email' />
      <input type='date' ref={input => formFields.date = input} placeholder='Date' />
      <input type='number' ref={input => formFields.movie_id = input} placeholder='Movie #id' />
      <input type='number' min='0' max='4' ref={input => formFields.rating = input} placeholder='Rating (out of 4)' />
      <input ref={input => formFields.comment = input} placeholder='Comment' />
      <button>Submit</button>
    </form>
  )
}