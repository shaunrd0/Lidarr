import PropTypes from 'prop-types';
import React from 'react';
import albumEntities from 'Album/albumEntities';
import AlbumSearchCellConnector from 'Album/AlbumSearchCellConnector';
import AlbumTitleLink from 'Album/AlbumTitleLink';
import ArtistNameLink from 'Artist/ArtistNameLink';
import RelativeDateCellConnector from 'Components/Table/Cells/RelativeDateCellConnector';
import TableRowCell from 'Components/Table/Cells/TableRowCell';
import TableSelectCell from 'Components/Table/Cells/TableSelectCell';
import TableRow from 'Components/Table/TableRow';

function MissingRow(props) {
  const {
    id,
    artist,
    releaseDate,
    albumType,
    foreignAlbumId,
    title,
    lastSearchTime,
    disambiguation,
    statistics,
    isSelected,
    columns,
    onSelectedChange
  } = props;

  if (!artist) {
    return null;
  }

  const {
    trackFileCount = 0,
    trackCount = 0
  } = statistics || {};

  return (
    <TableRow>
      <TableSelectCell
        id={id}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
      />

      {
        columns.map((column) => {
          const {
            name,
            isVisible
          } = column;

          if (!isVisible) {
            return null;
          }

          if (name === 'artists.sortName') {
            return (
              <TableRowCell key={name}>
                <ArtistNameLink
                  foreignArtistId={artist.foreignArtistId}
                  artistName={artist.artistName}
                />
              </TableRowCell>
            );
          }

          if (name === 'albums.title') {
            return (
              <TableRowCell key={name}>
                <AlbumTitleLink
                  foreignAlbumId={foreignAlbumId}
                  title={title}
                  disambiguation={disambiguation}
                />
              </TableRowCell>
            );
          }

          if (name === 'albumType') {
            return (
              <TableRowCell key={name}>
                {albumType}
              </TableRowCell>
            );
          }

          if (name === 'tracks') {
            // trackCount = "wanted" tracks (monitored + released, or with-file).
            // With the fork's Tracks.Monitored column this matches what the
            // user actually expects to see downloaded for this album — not
            // the full release track count (which would be totalTrackCount).
            return (
              <TableRowCell key={name}>
                {trackFileCount}/{trackCount}
              </TableRowCell>
            );
          }

          if (name === 'releaseDate') {
            return (
              <RelativeDateCellConnector
                key={name}
                date={releaseDate}
              />
            );
          }

          if (name === 'albums.lastSearchTime') {
            return (
              <RelativeDateCellConnector
                key={name}
                date={lastSearchTime}
              />
            );
          }

          if (name === 'actions') {
            return (
              <AlbumSearchCellConnector
                key={name}
                albumId={id}
                artistId={artist.id}
                albumTitle={title}
                albumEntity={albumEntities.WANTED_MISSING}
                showOpenArtistButton={true}
              />
            );
          }

          return null;
        })
      }
    </TableRow>
  );
}

MissingRow.propTypes = {
  id: PropTypes.number.isRequired,
  artist: PropTypes.object.isRequired,
  releaseDate: PropTypes.string.isRequired,
  foreignAlbumId: PropTypes.string.isRequired,
  albumType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  lastSearchTime: PropTypes.string,
  disambiguation: PropTypes.string,
  statistics: PropTypes.object,
  isSelected: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectedChange: PropTypes.func.isRequired
};

export default MissingRow;
