namespace ProjectStructure.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public string Category { get; set; }
        public string SKU { get; set; }
        public bool Available { get; set; }
        public string ImageUrl { get; set; }
    }
}
