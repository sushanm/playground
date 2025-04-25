using System.Data.SqlClient;
using Arbinger.Data;
using Arbinger.Utils;

namespace Arbinger.Repos
{
    public interface IIRepository
    {
        void DeleteAllOnSubmit<T>(IEnumerable<T> t);
        void DeleteOnSubmit<T>(T t);
        void InsertAllOnSubmit<T>(IEnumerable<T> t);
        void InsertOnSubmit<T>(T t);
        void SubmitChanges();
    }

    public abstract class IRepository : IIRepository
    {
        protected abstract ArbingerSQLV2DataContext Context { get; }

        public void DeleteAllOnSubmit<T>(IEnumerable<T> t)
        {
            Context.GetTable(t.GetType()).DeleteAllOnSubmit(t);
        }

        public void DeleteOnSubmit<T>(T t)
        {
            Context.GetTable(t.GetType()).DeleteOnSubmit(t);
        }

        public void InsertAllOnSubmit<T>(IEnumerable<T> t)
        {
            Context.GetTable(t.GetType()).InsertAllOnSubmit(t);
        }

        public void InsertOnSubmit<T>(T t)
        {
            Context.GetTable(t.GetType()).InsertOnSubmit(t);
        }

        public void SubmitChanges()
        {
            try
            {
                Polly.Policy retryPolicy = Policies.EponentialDatabaseRetryPolicy(3, 1000);
                retryPolicy.Execute(() => Context.SubmitChanges());
            }
            catch (SqlException sqlEx)
            {
                Logbook logbook = new(Context);
                _ = logbook.Create(new()
                {
                    Ex = sqlEx,
                    Description = "An issue occured with submitting changes to the database.",
                    Level = Enumerators.ERROR_LEVEL.FATAL,
                    ModuleName = "SubmitChanges"
                });
                throw;
            }
            catch (Exception ex)
            {
                Logbook logbook = new(Context);
                _ = logbook.Create(new()
                {
                    Ex = ex,
                    Description = "An issue occured with submitting changes to the database, this appears to be a non-SQL exception.",
                    Level = Enumerators.ERROR_LEVEL.FATAL,
                    ModuleName = "SubmitChanges"
                });
                throw;
            }
        }
    }
}
