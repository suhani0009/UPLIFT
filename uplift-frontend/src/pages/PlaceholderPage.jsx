import PageHeader from "../components/layout/PageHeader";

function PlaceholderPage({ title, description }) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <section className="card card-pad placeholder-card">
        <p className="muted-panel">
          This module is not part of Slice 1. Navigation is in place so you can
          move around the console; the working screen is Dashboard.
        </p>
      </section>
    </>
  );
}

export default PlaceholderPage;
