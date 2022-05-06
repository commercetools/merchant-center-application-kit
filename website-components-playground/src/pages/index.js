import { Link } from 'gatsby';

const Index = () => (
  <div>
    <h1>UI components playground</h1>
    <ul>
      <li>
        <Link to="info-dialog">{'<InfoDialog>'}</Link>
      </li>
      <li>
        <Link to="confirmation-dialog">{'<ConfirmationDialog>'}</Link>
      </li>
      <li>
        <Link to="form-dialog">{'<FormDialog>'}</Link>
      </li>
      <li>
        <Link to="info-modal-page">{'<InfoModalPage>'}</Link>
      </li>
      <li>
        <Link to="form-modal-page">{'<FormModalPage>'}</Link>
      </li>
      <li>
        <Link to="custom-form-modal-page">{'<CustomFormModalPage>'}</Link>
      </li>
      <li>
        <Link to="tabular-modal-page">{'<TabularModalPage>'}</Link>
      </li>
      <li>
        <Link to="tabular-main-page">{'<TabularMainPage>'}</Link>
      </li>
      <li>
        <Link to="tabular-detail-page">{'<TabularDetailPage>'}</Link>
      </li>
      <li>
        <Link to="info-detail-page">{'<InfoDetailPage>'}</Link>
      </li>
      <li>
        <Link to="custom-form-detail-page">{'<CustomFormDetailPage>'}</Link>
      </li>
      <li>
        <Link to="form-detail-page">{'<FormDetailPage>'}</Link>
      </li>
    </ul>
  </div>
);

export default Index;
