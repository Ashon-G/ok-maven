export const Pricing = () => {
  return (
    <section id="pricing" className="bg-white py-24">
      <div className="container">
        <h2 className="mb-16 text-center text-4xl font-bold">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <div className="mx-auto max-w-4xl">
          <stripe-pricing-table 
            pricing-table-id="prctbl_1QHagtBt4buW8DaZ7ZVi5qJS"
            publishable-key="pk_live_51QDdjEBt4buW8DaZNJJfWTmasQlQugfOYl7FA9yrpyhaenClW3jZTJbSvNgKk0hgiEVq4FXrVvyzj2glC9PAZFOg00MSu7DbhF">
          </stripe-pricing-table>
        </div>
      </div>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
    </section>
  );
};