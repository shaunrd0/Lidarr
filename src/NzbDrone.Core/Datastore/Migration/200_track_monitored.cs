using FluentMigrator;
using NzbDrone.Core.Datastore.Migration.Framework;

namespace NzbDrone.Core.Datastore.Migration
{
    [Migration(200)]
    public class track_monitored : NzbDroneMigrationBase
    {
        protected override void MainDbUpgrade()
        {
            Alter.Table("Tracks").AddColumn("Monitored").AsBoolean().NotNullable().WithDefaultValue(true);
        }
    }
}
