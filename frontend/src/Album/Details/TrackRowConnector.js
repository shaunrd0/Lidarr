import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { toggleTrackMonitored } from 'Store/Actions/trackActions';
import { deleteTrackFile } from 'Store/Actions/trackFileActions';
import createTrackFileSelector from 'Store/Selectors/createTrackFileSelector';
import TrackRow from './TrackRow';

function createMapStateToProps() {
  return createSelector(
    (state, { id }) => id,
    (state) => state.tracks.items,
    createTrackFileSelector(),
    (id, trackItems, trackFile) => {
      // The connector is given the track id directly; pluck the live record
      // from state.tracks.items so we get isSaving (set by the toggle thunk)
      // without re-fetching.
      const track = trackItems.find((t) => t.id === id);

      return {
        isSaving: track ? !!track.isSaving : false,
        trackFilePath: trackFile ? trackFile.path : null,
        trackFileSize: trackFile ? trackFile.size : null,
        customFormats: trackFile ? trackFile.customFormats : [],
        customFormatScore: trackFile ? trackFile.customFormatScore : 0,
        indexerFlags: trackFile ? trackFile.indexerFlags : 0
      };
    }
  );
}

const mapDispatchToProps = {
  deleteTrackFile,
  onMonitorTrackPress(trackId, monitored) {
    return toggleTrackMonitored({ trackId, monitored });
  }
};

export default connect(createMapStateToProps, mapDispatchToProps)(TrackRow);
