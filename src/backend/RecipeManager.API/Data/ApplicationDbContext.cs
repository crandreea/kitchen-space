using Microsoft.EntityFrameworkCore;
using RecipeManager.API.Models;

namespace RecipeManager.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Ingredient> Ingredients { get; set; }
    public DbSet<Instruction> Instructions { get; set; }
    public DbSet<UserSavedRecipe> UserSavedRecipes { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").UseIdentityAlwaysColumn();
            entity.Property(e => e.Username).HasColumnName("username").IsRequired().HasMaxLength(50);
            entity.Property(e => e.Email).HasColumnName("email").IsRequired().HasMaxLength(100);
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.PasswordSalt).HasColumnName("password_salt");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at").HasDefaultValueSql("now()");
            entity.Property(e => e.EmailConfirmed).HasColumnName("email_confirmed").HasDefaultValue(false);
                
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
        });
        
        modelBuilder.Entity<UserSavedRecipe>()
            .HasKey(usr => new { usr.UserId, usr.RecipeId });
        
        modelBuilder.Entity<UserSavedRecipe>()
            .HasOne(usr => usr.User)       
            .WithMany()                    
            .HasForeignKey(usr => usr.UserId) 
            .OnDelete(DeleteBehavior.Cascade); 

        modelBuilder.Entity<UserSavedRecipe>()
            .HasOne(usr => usr.Recipe)      
            .WithMany()                    
            .HasForeignKey(usr => usr.RecipeId)
            .OnDelete(DeleteBehavior.Cascade); 
    }
}