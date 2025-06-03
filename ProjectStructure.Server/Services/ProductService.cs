using ProjectStructure.Server.Models;
using ProjectStructure.Server.Repository;

namespace ProjectStructure.Server.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repo;

        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }

        public Task<IEnumerable<Product>> GetAllAsync() => _repo.GetAllAsync();
        public Task<Product?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);
        public Task<Product> CreateAsync(Product product) => _repo.CreateAsync(product);
        public Task UpdateAsync(Product product) => _repo.UpdateAsync(product);
        public Task DeleteAsync(int id) => _repo.DeleteAsync(id);
    }
}
