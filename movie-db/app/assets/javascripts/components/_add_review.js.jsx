const AddReview = (props) => {
  let formFields = {}
  var movie_id = props.movie_id;
  var name = props.movie.current;
  var date = new Date();
  var today = date.getFullYear().toString() + "-" + (date.getMonth() + 101).toString().substring(1) + "-" + (date.getDate() + 100).toString().substring(1);

  return (
    <form className="container thin padding-top left-float" onSubmit={(e) => {
      props.handleFormSubmit(formFields.email.value, formFields.date.value, name ? name.state.movie_info.original_title : "", movie_id, formFields.rating.value, formFields.comment.value);
      e.target.reset();
      e.preventDefault();
    }}>
      <div>
        <h3>Add a new review</h3>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type='email' className="form-control" ref={input => formFields.email = input} placeholder='Email' required />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Date</label>
        <div className="col-sm-10">
          <input type='date' defaultValue={today} className="form-control" ref={input => formFields.date = input} placeholder='Date' required disabled />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Rating</label>
        <div className="col-sm-10">
          <input type='number' min='0' max='4' className="form-control" ref={input => formFields.rating = input} placeholder='Rating (out of 4)' required />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Comment</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" ref={input => formFields.comment = input} placeholder='Comment' />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>
    </form >
  )
}