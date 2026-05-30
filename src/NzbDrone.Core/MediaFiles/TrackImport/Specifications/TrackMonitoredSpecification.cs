using System.Linq;
using NLog;
using NzbDrone.Core.DecisionEngine;
using NzbDrone.Core.Download;
using NzbDrone.Core.Parser.Model;

namespace NzbDrone.Core.MediaFiles.TrackImport.Specifications
{
    public class TrackMonitoredSpecification : IImportDecisionEngineSpecification<LocalTrack>
    {
        private readonly Logger _logger;

        public TrackMonitoredSpecification(Logger logger)
        {
            _logger = logger;
        }

        public Decision IsSatisfiedBy(LocalTrack item, DownloadClientItem downloadClientItem)
        {
            // Manual imports (user-initiated, no download-client context) bypass the
            // monitor filter so a one-off restore from disk still works.
            if (downloadClientItem == null)
            {
                return Decision.Accept();
            }

            if (item.Tracks != null && item.Tracks.Any() && item.Tracks.All(t => !t.Monitored))
            {
                _logger.Debug("All candidate tracks for {0} are unmonitored; rejecting import", item.Path);
                return Decision.Reject("Track is not monitored");
            }

            return Decision.Accept();
        }
    }
}
