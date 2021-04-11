using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiAlunos.Models
{
    public class AlunosContext : DbContext
    {
        public AlunosContext(DbContextOptions<AlunosContext> options) 
            : base(options)
        {

        }

        public DbSet<Aluno> Alunos { get; set; }
    }
}
